#!/usr/bin/env bash

# Set the frontend to non-interactive
DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

# Get software list and update
apt-get update -y
apt-get dist-upgrade -y

# Reinstall virtualbox guest additions (needed if kernel update occured)
apt-get install -y make	linux-headers-$(uname -r)			# Required for vbox setup
/etc/init.d/vboxadd setup

# Install required software
apt-get install -y mongodb

# Install utility software
apt-get install -y vim screen
