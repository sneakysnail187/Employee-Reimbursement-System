namespace MagicBall;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Welcome to Magic Ball!");
        Console.WriteLine("Think about your question, and type something!");

        string? userInput = Console.ReadLine();

        if(!string.IsNullOrEmpty(userInput)){
            Console.WriteLine(GetPrediction());
        }
        else{
            Console.WriteLine("Type something! \n");
            Main(args);
        }
    }

    public static string GetPrediction(){

        string[] predictions = {
            "yap15",
            "yap14",
            "yap13",
            "yap12",
            "yap11",
            "yap0",
            "yap9",
            "yap8",
            "yap7",
            "yap6",
            "yap5",
            "yap4",
            "yap3",
            "yap2",
            "yap1"
        };

        Random myRand = new Random();
        int randomIndex = myRand.Next(0, predictions.Length);

        return predictions[randomIndex];

    }
}
