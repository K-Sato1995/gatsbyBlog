---
title: "Create data backups using backup gem "
description: How to create data backups with rails using backup gem.
slug: create-data-backups-using-backup-gem
date: 2019-06-26
language: english
cover: ./cover.png
tags: 
  - Backup
---
# Create a backup script

The command below will generate a folder in your user's home directory called Backup.

The `--trigger` option specifies which backup model you wish to run.

```
$ backup generate:model --trigger my_backup --databases="postgresql"
```

The model file you just created would be located in `~/Backup/models/my_backup.rb`


# Setup your Backup script
In order to perform a backup job, you’ll need to update the generated model file.

```
$ vi ~/Backup/models/my_backup.rb
```

```ruby
# encoding: utf-8

##
# Backup Generated: my_backup
# Once configured, you can run the backup with the following command:
#
# $ backup perform -t my_backup [-c <path_to_configuration_file>]
#
Backup::Model.new(:db_backup, 'Description for my_backup') do
  ##
  # Split [Splitter]
  #
  # Split the backup file in to chunks of 250 megabytes
  # if the backup file size exceeds 250 megabytes
  #
  database PostgreSQL do |db|
    # To dump all databases, set `db.name = :all` (or leave blank)
    db.name               = "development"
    db.username           = "postgres"
    db.password           = ""
    db.host               = "postgres"
    db.port               = 5432
    # When dumping all databases, `skip_tables` and `only_tables` are ignored.
    db.additional_options = []
  end

  store_with Local do |local|
    local.path       = "~/backups/"
    local.keep       = 5
  end

  split_into_chunks_of 250

end
```

Once you’ve setup your configuration, check your work with:

```
$ backup check
```

# Perform backups

The command below will load the main configuration file, located by default at `~/Backup/config.rb`.

```
$ backup perform --trigger my_backup
```
When completed, you will find your backup in the `Storage` path you specified. 

You can also specify a config file like the code below.

```
backup perform --trigger db_backup --config-file './config.rb'
```

# References 
- [Overview · Backup Documentation](http://backup.github.io/backup/v4/)
- [Hourly Production Server Database And File Backups | GoRails](https://gorails.com/guides/hourly-production-server-database-and-file-backups)
- [How to import an SQL file using the command line in MySQL? - Stack Overflow](https://stackoverflow.com/questions/17666249/how-to-import-an-sql-file-using-the-command-line-in-mysql)
- [Backup a Rails Database with the Backup and Whenever Gems - Vladi Gleba](http://vladigleba.com/blog/2014/06/30/backup-a-rails-database-with-the-backup-and-whenever-gems/)
- [Create backups in the project directory](https://github.com/brewbit/brewbit.com/tree/master/backup)
- [Backup complains about missing dependency even though it is installed · Issue #420 · backup/backup · GitHub](https://github.com/backup/backup/issues/420)
