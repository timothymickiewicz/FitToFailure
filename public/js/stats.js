// get all workout data from back-end
// Generates charts
fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });


API.getWorkoutsInRange()

  function generatePalette() {
    const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
  }
function populateChart(data) {
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      datasets: [
        {
          // Broken
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });
}

function duration(dbFitness) {
  // let modifiedResponse = [];
  // let exercisesCombined = 0;
  // let day = dbFitness[0].day.slice(0, 10);
  // console.log(day);
  // dbFitness.forEach(workout => {
  //   console.log(exercisesCombined);
  //   let currentDay = workout.day.slice(0, 10);
  //   let workoutDuration = 0;
  //   workout.exercises.forEach(exercise => {
  //     workoutDuration += exercise.duration;
  //     console.log(workoutDuration);
  //   });
  //   if (currentDay === day) {
  //     exercisesCombined += workoutDuration;
  //     day = currentDay;
  //     return
  //   }
  //   else {
  //     modifiedResponse.push(exercisesCombined);
  //     exercisesCombined = 0;
  //     day = currentDay;
  //     return
  //   }
  // });
  // if (modifiedResponse.length === 0) {
  //   modifiedResponse.push(exercisesCombined);
  // }
  // console.log(modifiedResponse);
  let durations = [];

  dbFitness.forEach(workout => {
    workout.exercises.forEach(exercise => {
      durations.push(exercise.duration);
    });
  });
  return durations;
}

function calculateTotalWeight(data) {
  let total = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      total.push(exercise.weight);
    });
  });

  return total;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });
  
  return workouts;
}
