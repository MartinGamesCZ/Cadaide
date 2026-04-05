//go:build !windows

package cmdw

import "os/exec"

func SetSysProcAttr(cmd *exec.Cmd) {
	// no-op on Unix
}
