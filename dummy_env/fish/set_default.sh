#!/bin/bash
echo "Setting fish shell as default"

echo "/usr/local/bin/fish" | sudo tee -a /etc/shells

chsh -s /usr/local/bin/fish