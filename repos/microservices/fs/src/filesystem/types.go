package filesystem

type FileType string

const (
	FileTypeFile      FileType = "file"
	FileTypeDirectory FileType = "directory"
)

type FileInfo struct {
	Name string   `json:"name"`
	Path string   `json:"path"`
	Type FileType `json:"type"`
}
