#!/usr/bin/env bash

# Set the frontend to non-interactive
DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

# Get software list
echo "Updating software listing..."
apt-get update -y  > /dev/null
echo "...Done"


# Install required software
echo "Installing Mongo"
apt-get install -y mongodb  > /dev/null 2>&1
echo "...Done"

# Install utility software
echo "Installing utility software..."
apt-get install -y vim screen  > /dev/null 2>&1
echo "...Done"
