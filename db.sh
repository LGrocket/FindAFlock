#!/usr/bin/env bash

# Set the frontend to non-interactive
DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

# Get software list and update
echo "Updating..."
apt-get update -y  > /dev/null
apt-get dist-upgrade -y  > /dev/null 2>&1
echo "...Done"


# Install required software
echo "Installing Mongo"
apt-get install -y mongodb  > /dev/null 2>&1
echo "...Done"

# Install utility software
echo "Installing utility software..."
apt-get install -y vim screen  > /dev/null 2>&1
echo "...Done"

# Reinstall virtualbox guest additions (needed if kernel update occured)
echo "Installing VirtualBox Guest Additions..."
apt-get install -y make
apt-get install -y linux-headers-$(uname -r) # Required for vbox setup
/etc/init.d/vboxadd setup
echo "...Done"
