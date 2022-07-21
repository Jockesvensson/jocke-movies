export const ratingArrayFunction = (movies, setSorted, setCompletedRatingArray, setHighestValue, setHighestRating, setAverageRating) => {
    const ratingArray = movies.map((obj, index) => obj.newRating);

    const ratingFiltered = ratingArray.filter(
        (type, index) => ratingArray.indexOf(type) === index
    );

    const sorted = ratingFiltered.sort((a, b) => a - b);
    setSorted(sorted);

    const counts: any[] = [];
        ratingArray.forEach((x) => {
            counts[x] = (counts[x] || 0) + 1;
        });

    const completedRatingArray = counts.slice(1, 11);
    setCompletedRatingArray(completedRatingArray);
      
    let highestValue = 0;
    let highestRating = "";
    for (const [key, value] of Object.entries(counts)) {
      if (value > highestValue) {
        highestValue = value;
        highestRating = key;
        setHighestValue(highestValue);
        setHighestRating(highestRating);
      }
    }

    const averageRating =
        ratingArray.reduce((sum, curr) => sum + Number(curr), 0) /
        ratingArray.length;
    setAverageRating(averageRating);
}