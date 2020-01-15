#!/bin/bash

APP_USER=ec2-user

cd /home/$APP_USER/apps/ 

if [ -L ${APPLICATION_NAME} ] ; then
    if [ -e ${APPLICATION_NAME} ] ; then
        {
            set -e
            /bin/bash ./$APPLICATION_NAME/bin/$APPLICATION_NAME status
            /bin/bash ./$APPLICATION_NAME/bin/$APPLICATION_NAME start    
        }
    else 
        error_exit "Symbolic link target file is missing!  Aborting."
    fi
else 
    error_exit "Application symbolic link is missing!  Aborting."
fi

error_exit()
{
	echo "$1" 1>&2
	exit 1
}

exit 0