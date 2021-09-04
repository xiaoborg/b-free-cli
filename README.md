# xb-free-cli
## Installation

npm i xb-free-cli -g
    
## Usage
- **xb@cli init projectName --type=typeValue**
- *typeValue:*

typeValue | desc | git url
---|--- |---
package | A custom npm package base | https://github.com/xiaoborg/npm-package-base


---
##### type=package

1. cd projectName

2. npm i or yarn install

###### publish

- The following are two ways to publish package: 

    1. Manual

        (1)npm login
           -Input Username,Password,Email
            
        (2)npm version <patch,minor,major> (Optional)
           
        (3)npm publish

    2. Automatic release
        First check if the computer is installed [JQ](https://stedolan.github.io/jq/) & [Expect](https://core.tcl-lang.org/expect/home) \
        (1) Create a new file <npm.login.config.json>
        
        ```
        <!--npm.login.config.json-->
        {
          "Username": "",
          "Password": "",
          "Email": ""
        }
        ```
        (2) npm run build
        
        (3) sh ./publish.sh
        
        publish.sh - Its content can be modified as needed
            

---
##### type=vue
...
