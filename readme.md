# Note CLI - A Simple Terminal-Based Todo Manager

## Overview

As developers, we spend a significant amount of time in our terminals. Why not have a simple, offline-friendly CLI tool to help manage your project tasks efficiently? **Note CLI** provides an easy-to-use task management solution, accessible anytime without requiring an internet connection.

---

## 📌 Installation

### 🔹 Install from GitHub

Clone the repository and navigate to its root directory:

```bash
git clone https://github.com/aryankumar07/note_cli.git 
cd note_cli
```

Install dependencies and set up the package globally:

```bash
npm install -g
```

### 🔹 Install via NPM

You can also install **Note CLI** using [npm](https://www.npmjs.com/):

```bash
npm i @tarnished_aryan/note -g
```

#### Troubleshooting Installation Issues

If you encounter permission errors, try installing with `sudo`:

```bash
sudo npm i @tarnished_aryan/note -g
```

If errors persist, remove conflicting files from the specified paths in the error message and retry the installation.

---

## 🚀 Getting Started

To get an overview of the CLI, simply run:

```bash
note
```

### 🔹 Initial Setup

Before using the CLI, initialize it with:

```bash
note init
```

This sets up the necessary configuration for **Note CLI** to function correctly.

---

## 📖 Usage

### 🔹 General Help

To explore available commands and their usage, run:

```bash
note --help
```

## Note : By default a index named Todo conatiners have been made if no flag specified all changes will happen in this container


### 🔹 Managing Todo Containers

- **List all Todo containers:**
  ```bash
  note list
  ```
- **Create a new Todo container:**
  ```bash
  note create <FileName>
  ```
- **Delete a Todo container:**
  ```bash
  note delete <FileName>
  ```

### 🔹 Managing Todos

- **Add a new Todo:**
  ```bash
  note add <TodoName>
  ```
- **Mark a Todo as completed:**
  ```bash
  note done <TodoName>
  ```

---

## 🎯 Advanced Usage with Flags

### 🔹 Working with Specific Containers

- **List todos from a specific container:**
  ```bash
  note list -f <FileName>
  ```
- **Add a todo to a specific container:**
  ```bash
  note add <TodoName> -f <FileName>
  ```
- **Mark a specific todo as done in a container:**
  ```bash
  note done <TodoName> -f <FileName>
  ```

### 🔹 Marking All Todos as Done

- **Mark all todos as done:**
  ```bash
  note done -a
  ```
- **Mark all todos as done in a specific container:**
  ```bash
  note done -f <FileName> -a
  ```

  ### 🔹 Adding Priorities to Task
- **Note Support 3 types : {High, Medium, low}**
- **THe default is set to "LOW" if not specified**
  
  ```bash
  note add <TodoName> -p medium
  ```
- **To add to a specific File use the -f flag**
 ```bash
  note add <TodoName> -p medium -f <FileName>
  ```
---

## 🤝 Contributing

We welcome contributions! To make changes:

1. Open an issue to discuss improvements.
2. Fork the repository and create a feature branch.
3. Submit a pull request with a detailed explanation.

Please ensure that updates include appropriate tests before submitting.

---

Enjoy seamless task management with **Note CLI**! 🚀
