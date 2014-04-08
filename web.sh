#!/usr/bin/env bash

# Set the frontend to non-interactive
DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

# Get software listings and update
echo "Updating..."
apt-get update -y > /dev/null
apt-get dist-upgrade -y > /dev/null
echo "Done"

# Install required software
echo "Installing Node.js..."
apt-get install -y python-software-properties 	# Add "apt-add-repository"
add-apt-repository ppa:chris-lea/node.js 		# Install node from latest versions
apt-get update -y > /dev/null
apt-get install -y nodejs
echo "Done"

echo "Installing NPM modules..."
npm config set registry http://registry.npmjs.org/	# Fix problem with NPM + vagrant setup (https://github.com/npm/npm/issues/2119)
oldDir=$(pwd)
cd /vagrant
npm install > /dev/null
cd $oldDir
echo "Done"

# Install utility software
echo "Installing utility software..."
apt-get install -y vim screen
echo "Done"

# Reinstall virtualbox guest additions (needed if kernel update occured)
echo "Updating VirtualBox Guest Additions..."
apt-get install -y make linux-headers-$(uname -r)	# Required for vbox setup
/etc/init.d/vboxadd setup
echo "Done"
