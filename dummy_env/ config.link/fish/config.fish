set -g -x PATH /usr/local/bin $PATH

set -gx RBENV_ROOT /usr/local/var/rbenv
. (rbenv init -|psub)

status --is-interactive; and . (rbenv init -|psub)
