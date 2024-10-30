I will be writing my curiosity report on the Linux kernel's support for containers.
Here’s some terms which I had no idea about, which I found the definitions for.
VM (Virtual Machine): “A computer file, typically called an image, that behaves like an actual computer.
Container: 1 or more processes that are isolated from the rest of the system. All the files necessary to run them are provided from a distinct image.	
Daemon: a computer program that runs in the background, performing tasks without direct user interaction.
Redis (Remote Dictionary Serrver): Stores all data in-memory—delivering the fastest possible performance when reading or writing data—and offers built-in replication capabilities
So, in CS 329 we’re using something called a Docker. From my basic understanding of Docker, it’s a way to compartmentalize software so it’s 
for sure going to run everywhere. These containers are like virtual machines that setup their shop in your PC. You know, when you’ve got to run 
some good old software and it needs to install like a billion dependencies the first time it runs? I believe Docker stops this from happening with by 
running these containers on your computer with a default operating system and packages preinstalled. That way Docker will run the same no matter which 
computer it’s on. (As long as you meet the minimum requirements).

At least that’s what I think Docker does… We will begin our journey to understand starting now! Naturally, we need to take a step back and understand the 
Linux kernel’s support for containers. The problem with porting programs is how difficult it is to make them compatible. I believe that these containers 
made up the solution. “The container image distribution is a lot easier than installing new copies of operating systems.” (Red Hat) Apparently in 2008, 
Docker came up with some wonderful technology to layer containers in some neat way. This is what I’m going to talk about.

The Docker consists of the Engine, Client, Registries, Images, and, Dockerfile. Let’s break this down. The Engine is the “technology for building and 
containerizing your applications”. (DockerDocs) Next, the Client is how the user tells Docker what to do. You can use any good command line interface 
(like bash) to communicate with Docker. Simply prefix your commands with Docker. And if your shell’s not TTY complaint, prefix your commands with WINPTY
Docker. Then, the Registries are the place where the Images are stored. Also, as far as I know, Images are basically synonymous with Containers. 
Following, the DockerFile is where you specify which files to run and which network ports to run on. Now, all of this is simplified and visualized 
in the Docker hub, which you use to start up those engines!
