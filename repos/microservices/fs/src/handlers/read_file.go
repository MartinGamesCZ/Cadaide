package handlers

import "os"

type ReadFileParams struct {
	Path string `json:"path"`
}

type ReadFileResult struct {
	Content string `json:"content"`
}

func HandleReadFile(params ReadFileParams) (ReadFileResult, error) {
	content, err := os.ReadFile(params.Path)
	if err != nil {
		return ReadFileResult{}, err
	}

	return ReadFileResult{Content: string(content)}, nil
}
