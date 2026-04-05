package window

import (
	"os/exec"
	"runtime"
	"strings"
	"unsafe"

	webview "github.com/webview/webview_go"
)

/*
#cgo windows LDFLAGS: -luser32
#cgo linux pkg-config: gtk+-3.0

#ifdef _WIN32
#include <windows.h>

void make_frameless(void* hwnd) {
    HWND h = (HWND)hwnd;
    LONG style = GetWindowLong(h, GWL_STYLE);
    style &= ~(WS_CAPTION | WS_THICKFRAME | WS_MINIMIZE | WS_MAXIMIZE | WS_SYSMENU);
    SetWindowLong(h, GWL_STYLE, style);
    SetWindowPos(h, NULL, 0, 0, 0, 0,
        SWP_NOMOVE | SWP_NOSIZE | SWP_NOZORDER | SWP_FRAMECHANGED);
}
#else
#include <gtk/gtk.h>

void make_frameless(void* widget) {
    gtk_window_set_decorated(GTK_WINDOW(widget), FALSE);
}
#endif
*/
import "C"

type Window struct {
	config  WindowConfig
	webview webview.WebView
}

type WindowConfig struct {
	Title  string
	Width  int
	Height int
}

func pickFolder() string {
	switch runtime.GOOS {
	case "windows":
		cmd := exec.Command("powershell", "-Command", `
			Add-Type -AssemblyName System.Windows.Forms
			$dialog = New-Object System.Windows.Forms.FolderBrowserDialog
			$dialog.Description = 'Select installation folder'
			$result = $dialog.ShowDialog()
			if ($result -eq 'OK') { $dialog.SelectedPath }
		`)
		out, err := cmd.Output()
		if err != nil {
			return ""
		}
		return strings.TrimSpace(string(out))

	case "darwin":
		cmd := exec.Command("osascript", "-e", `
			POSIX path of (choose folder with prompt "Select installation folder")
		`)
		out, err := cmd.Output()
		if err != nil {
			return ""
		}
		return strings.TrimSpace(string(out))

	case "linux":
		// zkus zenity (GTK), pak kdialog (KDE)
		for _, tool := range [][]string{
			{"zenity", "--file-selection", "--directory", "--title=Select installation folder"},
			{"kdialog", "--getexistingdirectory", "."},
		} {
			cmd := exec.Command(tool[0], tool[1:]...)
			out, err := cmd.Output()
			if err != nil {
				continue
			}
			return strings.TrimSpace(string(out))
		}
		return ""
	}

	return ""
}

func New(config WindowConfig) *Window {
	wv := webview.New(false)

	wv.Bind("__openFolderPicker", func() string {
		return pickFolder()
	})

	wv.Init(`
    window.api = {
        openSelectDirectoryDialog: () => window.__openFolderPicker()
    }
`)

	return &Window{
		config:  config,
		webview: wv,
	}
}

func (w *Window) Destroy() {
	w.webview.Destroy()
}

func (w *Window) Open(url string) {
	w.webview.SetTitle(w.config.Title)
	w.webview.SetSize(w.config.Width, w.config.Height, webview.HintNone)

	w.webview.Navigate(url)

	// Make frameless must run on UI thread
	w.webview.Dispatch(func() {
		handle := w.webview.Window()
		C.make_frameless(unsafe.Pointer(handle))
	})

	w.webview.Run()
}
