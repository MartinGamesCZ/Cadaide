package handlers

import (
	"cadaide/fs/src/filesystem"
	"log"
	"os"
	"path/filepath"
	"sync"
)

type TreeDirParams struct {
	Path  string `json:"path"`
	Depth int    `json:"depth"`
}

type TreeDirResult struct {
	Entries []filesystem.FileInfo `json:"entries"`
}

const maxWorkers = 32

var workerSlots = make(chan struct{}, maxWorkers)

func HandleTreeDir(params TreeDirParams) (TreeDirResult, error) {
	collector := &entryCollector{}
	walker := &dirWalker{
		maxDepth:  params.Depth,
		collector: collector,
	}

	walker.wg.Add(1)
	walker.walk(params.Path, 0)
	walker.wg.Wait()

	return TreeDirResult{Entries: collector.entries()}, nil
}

type entryCollector struct {
	mu      sync.Mutex
	results []filesystem.FileInfo
}

func (c *entryCollector) add(batch []filesystem.FileInfo) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.results = append(c.results, batch...)
}

func (c *entryCollector) entries() []filesystem.FileInfo {
	c.mu.Lock()
	defer c.mu.Unlock()

	return c.results
}

type dirWalker struct {
	maxDepth  int
	collector *entryCollector
	wg        sync.WaitGroup
}

func (w *dirWalker) walk(dir string, currentDepth int) {
	defer w.wg.Done()

	entries, err := os.ReadDir(dir)
	if err != nil {
		log.Printf("[MICROSERVICE::FS] Error reading directory %s: %v", dir, err)
		return
	}

	batch := make([]filesystem.FileInfo, 0, len(entries))

	for _, e := range entries {
		if isHidden(e.Name()) {
			continue
		}

		fullPath := filepath.Join(dir, e.Name())
		batch = append(batch, filesystem.FileInfo{
			Name: e.Name(),
			Path: fullPath,
			Type: entryType(e),
		})

		if e.IsDir() && w.shouldRecurse(currentDepth) {
			w.wg.Add(1)
			w.walkAsync(fullPath, currentDepth+1)
		}
	}

	w.collector.add(batch)
}

func (w *dirWalker) walkAsync(dir string, depth int) {
	select {
	case workerSlots <- struct{}{}:
		go func() {
			w.walk(dir, depth)
			<-workerSlots
		}()

	default:
		w.walk(dir, depth)
	}
}

func (w *dirWalker) shouldRecurse(currentDepth int) bool {
	return w.maxDepth == 0 || currentDepth+1 < w.maxDepth
}

func isHidden(name string) bool {
	return name[0] == '.'
}

func entryType(e os.DirEntry) filesystem.FileType {
	if e.IsDir() {
		return filesystem.FileTypeDirectory
	}

	return filesystem.FileTypeFile
}
