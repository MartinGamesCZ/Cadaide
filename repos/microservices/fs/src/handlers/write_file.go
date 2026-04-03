package handlers

import "os"

type WriteFileParams struct {
	Path    string `json:"path"`
	Content string `json:"content"`
}

type WriteFileResult struct {
}

func HandleWriteFile(params WriteFileParams) (WriteFileResult, error) {
	err := os.WriteFile(params.Path, []byte(params.Content), 0644)
	if err != nil {
		return WriteFileResult{}, err
	}

	return WriteFileResult{}, nil
}
