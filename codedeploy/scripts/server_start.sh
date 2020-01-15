#!/bin/bash

APP_USER=ec2-user

cd /home/$APP_USER/apps/ 

if [ -L ${APPLICATION_NAME} ] ; then
    if [ -e ${APPLICATION_NAME} ] ; then
        /bin/bash ./$APPLICATION_NAME/bin/$APPLICATION_NAME status
        /bin/bash ./$APPLICATION_NAME/bin/$APPLICATION_NAME stop
        /bin/bash ./$APPLICATION_NAME/bin/$APPLICATION_NAME start    
    fi
fi
