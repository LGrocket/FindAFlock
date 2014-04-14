#!/usr/bin/env bash

# Set the frontend to non-interactive
DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

# Get software listings and update
echo "Updating..."
apt-get update -y > /dev/null 2>&1
#apt-get dist-upgrade -y > /dev/null 2>&1
echo "Done"

# Install required software
echo -e "Installing Main Software...\n\tInstalling dependencies..."
apt-get install -y python-software-properties > /dev/null 2>&1 	# Add "apt-add-repository"
add-apt-repository ppa:chris-lea/node.js 	 > /dev/null 2>&1	# Install node from latest versions
echo -e "\tDone\n\tInstalling Node.js..."
apt-get update -y > /dev/null 2>&1
apt-get install -y nodejs > /dev/null 2>&1
echo -e "\tDone\nDone"

echo "Installing NPM modules..."
npm config set registry http://registry.npmjs.org/	# Fix problem with NPM + vagrant setup (https://github.com/npm/npm/issues/2119)
oldDir=$(pwd)
cd /vagrant
npm install  > /dev/null #2>&1
cd $oldDir
echo "Done"

# Install utility software
echo "Installing utility software..."
apt-get install -y vim screen  > /dev/null
echo "Done"

# Reinstall virtualbox guest additions (needed if kernel update occured)
#apt-get install -y make linux-headers-$(uname -r)	> /dev/null 2>&1 # Required for vbox setup
#/etc/init.d/vboxadd setup
