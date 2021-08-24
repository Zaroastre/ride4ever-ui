#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os;

def main():
    print("SAVING DEV...");
    os.system("git add .");
    os.system('git commit -m "[PRODUCTION-SETUP] Clean project for production."');
    os.system("git push --set-upstream origin dev");
    print("SAVING MAIN...");
    os.system("git merge main");
    input();
    os.remove(".eslintrc.js");
    os.system("git add .")
    os.system('git commit -m "[PRODUCTION-SETUP] Clean project for production."');
    os.system("git push --set-upstream origin main");

if (__name__ == "__main__"):
    main();