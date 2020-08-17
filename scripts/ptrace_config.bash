#!/usr/bin/env bash

if [ "$OSTYPE" == "linux-gnu" ]; then
  ptrace_scope=`cat /proc/sys/kernel/yama/ptrace_scope`
  if [ "$ptrace_scope" != 0 ]; then
    echo "WARNING: ptrace_scope set to value other than 0, this might prevent debugger from connecting, try writing \"0\" to /proc/sys/kernel/yama/ptrace_scope.
Read more at https://www.kernel.org/doc/Documentation/security/Yama.txt"
    read -p "Set ptrace_scope to 0? y/N (default N)" set_ptrace_input
    if [ "$set_ptrace_input" == "y" ] || [ "$set_ptrace_input" == "Y" ]; then
      echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
    fi
  fi
fi
