
export const defaultCode = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,

  python: `def main():
    print("Hello World")


if __name__ == "__main__":
    main()`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`,

  javascript: `function main() {
    console.log("Hello World");
}

main();`,

  c: `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}`,

  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello World");
    }
}`,

  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}`,

  rust: `fn main() {
    println!("Hello World");
}`,
};
