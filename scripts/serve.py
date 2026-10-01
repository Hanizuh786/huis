#!/usr/bin/env python3
"""Daemonizing static server: detaches into its own session so it survives
the terminal tool's process-group cleanup. Prints PID, then exits."""
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

if os.fork() > 0:
    sys.exit(0)

os.setsid()

if os.fork() > 0:
    sys.exit(0)

os.chdir(ROOT)
sys.stdout.flush()
log = open("/tmp/huisjurist-server.log", "a")
os.dup2(log.fileno(), 1)
os.dup2(log.fileno(), 2)
os.execvp(
    "python3",
    ["python3", "-m", "http.server", str(PORT), "--bind", "127.0.0.1"],
)
