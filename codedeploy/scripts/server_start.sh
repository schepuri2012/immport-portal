#!/bin/bash

APP_USER=ec2-user
APP_NAME=immport-portal

cd /home/$APP_USER/apps/ 
/bin/bash ./$APP_NAME/bin/$APP_NAME stop
/bin/bash ./$APP_NAME/bin/$APP_NAME start