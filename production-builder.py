#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os;

def main():
    os.system("git add .");
    os.system('git commit -m "[PRODUCTION-SETUP] Clean project for production."');
    os.system("git push --set-upstream origin dev");
    os.system("git checkout main");
    os.system("git merge dev");
    os.remove(".eslintrc.js");
    os.system("git add .")
    os.system('git commit -m "[PRODUCTION-SETUP] Clean project for production."');
    os.system("git push --set-upstream origin main");

if (__name__ == "__main__"):
    main();