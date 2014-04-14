#!/usr/bin/env bash

# Set the frontend to non-interactive
DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

# Get software list
echo "Updating software listing..."
apt-get update -y  > /dev/null
echo "Done"


# Install required software
echo "Installing MongoDB..."
apt-get install -y mongodb > /dev/null 2>&1
echo "Done"

# Load the mock data
echo -e "Configuring MongoDB...\n\tConfiguring MongoDB"
sed -i "s/\(bind\_ip *= *\).*/\10\.0\.0\.0/" /etc/mongodb.conf
echo -e "\tDone\n\tRestarting MongoDB..."
service mongodb restart > /dev/null
sleep 15s
echo -e "\tDone\n\tImporting Mock Data..."
mongo /vagrant/scripts/mongo_mock_data.sh > /dev/null
echo -e "\tDone\nDone"

# Install utility software
echo "Installing utility software..."
apt-get install -y vim screen  > /dev/null 2>&1
echo "Done"
