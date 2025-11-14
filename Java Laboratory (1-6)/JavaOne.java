import java.util.Scanner;
import java.io.Console;

public class JavaOne {
    void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        Console console = System.console();

        String name;

        if (console != null) {
            name = console.readLine("Enter your name: ");
        } else {
            IO.print("Enter your name: ");
            name = sc.nextLine();
        }

        IO.print("Enter your age: ");
        int age = sc.nextInt();

        IO.println("Hello " + name + "! You are " + age + " years old.");
    }
}
