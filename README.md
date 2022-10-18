# AwsAssignment
An aws ec2 instance assingment, used to create a form for users to submit crime reports. The hosted server would then filter out their reports using AWS sentiment analysis tools and display the crime date in a form for police to use. This was my first attempt at using javascript properly, so forgive the scuffed structure. Also the sentiment analysis was not great maybe don't use this xD


ec2-user



NODE:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

. ~/.nvm/nvm.sh

nvm install --lts

check:
node -e "console.log('Running Node.js ' + process.version)


AWS SDK VARIABLES
export AWS_ACCESS_KEY_ID= youraccesskeyid
export AWS_SECRET_ACCESS_KEY= yoursecretaccesskey
export AWS_SESSION_TOKEN= yoursessiontoken


NODE MODULES
npm install

npm audit fix --force

![alt text](https://i.imgur.com/LnEFb4B.png)
