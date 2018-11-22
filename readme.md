# Time estimator

The most advanced projects estimator of the galaxy!

![estimation results](http://815b1b87b51011a7a029-623c55fb68acb92f1f433c6448bed244.r60.cf3.rackcdn.com/estimator/estimation-distribution.webp)

Based on the concepts presented in these articles:

- [Evidence Based Scheduling](https://www.joelonsoftware.com/2007/10/26/evidence-based-scheduling/)
- [Estimate your work better to make that planning conversation a little easier](https://blog.estimate-work.com/estimate-your-work-better-to-make-that-planning-conversation-a-little-easier-f6c6cbf40d8c)
- [How To Estimate Almost Any Software Deliverable in 90 Seconds](https://herdingcats.typepad.com/my_weblog/2013/08/how-to-estimate-almost-any-software-deliverable.html)

## The inputs

### Your estimation vectors

If you don't yet have those, just use `[1]` or any list of numbers that you think represent your previous estimation results. For example, `0.5` means you took 2 times as much time as planned, `2` means you did it in half the time.

### Your estimation specs

This is a list of tasks, each having four numbers: 

1. the most optimistic scenario
2. the number you think is most realistic for the task
3. the maximum number if the tasks proves to be more complex 
4. your confidence in your number (between `0-1`)
5. _optional_: I add my label for the task, it will not be used by the app

### A management overhead

My historical number is about 25%. This is stuff like emails, environment setup, booting in, etc.

## The simulation

The app will first do 100 rounds, where it "corrects" your specs with your estimation history. It will pick a random element from your estimation vectors list, and update (divide the numbers) your specs. Then it will do another 100 rounds of simulation, where it will generate a random number, based on your specs (skewed gaussian distribution).

It will then draw a distribution histogram and present at which certainty how many hours you have to provision.



