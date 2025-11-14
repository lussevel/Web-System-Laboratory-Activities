import java.util.Scanner;

public class JavaThree {
    void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int[] numbers = new int[5];
        int sum = 0;

        System.out.println("Enter 5 numbers:");

        // loop
        for (int i = 0; i < 5; i++) {
            System.out.print("Number " + (i + 1) + ": ");
            numbers[i] = sc.nextInt();
            sum += numbers[i];
        }

        // Calculate average
        double average = sum / 5.0;

        System.out.println("\nSum of numbers: " + sum);
        System.out.println("Average: " + average);
    }
}
