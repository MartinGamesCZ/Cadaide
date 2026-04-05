package main

import (
	"cadaide/src/cmdw"
	"cadaide/src/window"
	"log"
	"os"
	"os/exec"
	"path/filepath"
)

func main() {
	f, _ := os.OpenFile("cadaide.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	defer f.Close()
	log.SetOutput(f)

	appdir := os.Getenv("APPDIR")

	log.Println(appdir)

	var bunBinary string
	if os.Getenv("OS") == "Windows_NT" {
		bunBinary = "bun.exe"
	} else {
		bunBinary = "bun"
	}

	var fsBinary string
	if os.Getenv("OS") == "Windows_NT" {
		fsBinary = "fs.exe"
	} else {
		fsBinary = "fs"
	}

	go runCommand(appdir, []string{bunBinary, "server.js"}, "pkg/frontend", map[string]string{
		"PORT":     "3000",
		"HOSTNAME": "127.0.0.1",
	}, true)

	go runCommand(appdir, []string{bunBinary, "main.js"}, "pkg/backend", map[string]string{
		"NODE_ENV":        "production",
		"FS_BINARY_PATH":  filepath.Join(appdir, "pkg/microservices/fs/"+fsBinary),
		"BUN_BINARY_PATH": filepath.Join(appdir, "bin/"+bunBinary),
	}, true)

	w := window.New(window.WindowConfig{
		Title:  "Cadaide",
		Width:  1280,
		Height: 720,
	})

	defer w.Destroy()

	w.Open("http://localhost:3000")
}

func runCommand(appdir string, command []string, dir string, env map[string]string, hideWindow bool) error {
	cmd := exec.Command(command[0], command[1:]...)

	cmd.Dir = filepath.Join(appdir, dir)

	var envSeparator string
	if os.Getenv("OS") == "Windows_NT" {
		envSeparator = ";"
	} else {
		envSeparator = ":"
	}

	cmd.Env = append(os.Environ(), "PATH="+appdir+envSeparator+os.Getenv("PATH"))
	for k, v := range env {
		cmd.Env = append(cmd.Env, k+"="+v)
	}

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if hideWindow {
		cmdw.SetSysProcAttr(cmd)
	}

	err := cmd.Run()
	if err != nil {
		log.Println(err)
	}

	return nil
}
