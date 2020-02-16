---
title: "Testing your app in windows using VirtualBox"
slug: testing-your-app-in-windows-using-virtualbox
date: 2019-06-13
language: english
cover: ./cover.png
generate-card: false
tags: 
  - VirtualBox
description: Quick overview of how to use VirtualBox to test your web app in windows.
---
# (1) Download VirtualBox

You can download VirtualBox by following the instructions in the link below.

- [Oracle VM VirtualBox](https://www.virtualbox.org/)

# (2) Download Virtual Machine

You can download Virtual Machine by following the instructions in the link below.

[Free Virtual Machines from IE8 to MS Edge - Microsoft Edge Development](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/)

# (3) Boot up the virtual machine

Open Virtual Box.

![image](https://user-images.githubusercontent.com/32632542/59407207-8170e000-8deb-11e9-95d4-3c6e03cab49c.png)

You can boot up the virtual machine here.
Use `cmd` and `i` to import the downloaded folder.

![image](https://user-images.githubusercontent.com/32632542/59407216-89c91b00-8deb-11e9-84d0-e1cf1695e0e5.png)

Click the folder icon and select `IE -Win7.ovf` and click  `open`.

![image](https://user-images.githubusercontent.com/32632542/59407249-a36a6280-8deb-11e9-80e6-f0ce9da0358a.png)

Just click `import` unsless you want to change some default settings.

![image](https://user-images.githubusercontent.com/32632542/59407257-abc29d80-8deb-11e9-8c6a-5133d5ba56a6.png)

After importing the folder, select `IE11 - Win7` and click `start`.

![image](https://user-images.githubusercontent.com/32632542/59407279-bda44080-8deb-11e9-9966-4c1103427bfb.png)

Yay! The virtual machine is ready!

![image](https://user-images.githubusercontent.com/32632542/59407321-ceed4d00-8deb-11e9-964e-ba3601779c9b.png)

# (4) Setting the host on the virtual machine

Set host machine's local ip address as the virtual machine's host to access the service that is running on your host machine.

You can check out [this page](http://onocom.net/blog/windows-hosts-file/) to know more about it.

Run the command below under `Windows\System32\drivers\etc` on your virtual machine.

```
Windows\System32\drivers\etc: $ NotePad hosts
```

`hosts` would be opened with Notepad and set the local ip address as host of the virtual machine like the picture below.

![image](https://user-images.githubusercontent.com/32632542/59407377-f8a67400-8deb-11e9-80dd-5935a7cfa1bd.png)

# (5) Run the service on your host machine

Run your service like the command below.

```
$ rails s // example
```

Check `http://localhost:3000/` on the virtual machine if you can access to the service there.

# Important Commands

- command on the left side: Release captured mouse pointer.
- shift + right click: Open the cli at the directory you clicked.
- Notepad file: Open the file with Notepad.

# References 
- [How to use windons in VirtualBox](https://www.youtube.com/watch?v=NIauwnXqQr8)
- [How To Use VirtualBox - Complete Step by Step Tutorial](https://www.youtube.com/watch?v=Eno4l6pKQHc)
- [Chapter First Steps](https://www.virtualbox.org/manual/ch01.html#features-overview)
- [is it possible to run virtualbox inside a docker container - Stack Overflow](https://stackoverflow.com/questions/25741904/is-it-possible-to-run-virtualbox-inside-a-docker-container)
