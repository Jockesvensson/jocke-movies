import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import CloseIcon from "@mui/icons-material/Close";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { ratingArrayFunction } from "../helpers/helper";

const StatisticsInformation = ({ movies }) => {
  const [showStatisticModal, setShowStatisticModal] = useState<boolean>(false);
  const [highestValue, setHighestValue] = useState<number>(0);
  const [highestRating, setHighestRating] = useState<string>("");
  const [sorted, setSorted] = useState<any[]>([]);
  const [completedRatingArray, setCompletedRatingArray] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  const openModal = () => {
    setShowStatisticModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowStatisticModal(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    ratingArrayFunction(
      movies,
      setSorted,
      setCompletedRatingArray,
      setHighestValue,
      setHighestRating,
      setAverageRating
    );
  }, [movies]);

  return (
    <div className="mb-8">
      <button className="px-4 py-2 bg-green-200" onClick={() => openModal()}>
        Visa statistik
      </button>
      {showStatisticModal && (
        <div className="z-30 absolute -top-36 right-0 left-0 bottom-0 xsm:top-30 xsm:right-12 xsm:left-12 xsm:bottom-auto sm:top-40 sm:right-20 sm:left-20 bg-gray-100 px-4 pt-4 pb-12">
          <div className="flex justify-end">
            <CloseIcon
              sx={{ fontSize: 30, cursor: "pointer" }}
              onClick={() => closeModal()}
            />
          </div>
          <div className="flex justify-center">
            <div className="text-2xl font-semibold">
              Här visas lite statistik
            </div>
          </div>
          <div className="flex justify-center w-full mt-4 mb-2">
            <div className="inline-flex justify-center px-4 py-2 border-2 boder-black">
              <div className="mr-2">
                <div className="text-xl font-semibold">Betyg</div>
                {sorted.map((item, index) => (
                  <div key={index} className="flex">
                    <StarOutlineIcon sx={{ color: "rgb(87, 153, 239)" }} />
                    <div className="font-semibold">{item}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-xl font-semibold">Antal</div>
                {completedRatingArray.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-center font-semibold"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full mb-4">
            <div className="relative inline-flex justify-center flex-col px-4 py-2 border-2 boder-black font-semibold">
              <div className="">Flest antal</div>
              <div className="flex justify-between">
                <div className="flex">
                  <StarOutlineIcon sx={{ color: "rgb(87, 153, 239)" }} />
                  <div>{highestRating}</div>
                </div>
                <div className="">{highestValue} st</div>
              </div>
            </div>
            <div className="relative inline-flex justify-center flex-col px-4 py-2 ml-2 border-2 boder-black font-semibold">
              <div className="">Snittbetyg</div>
              <div className="flex justify-center">
                <StarOutlineIcon sx={{ color: "rgb(87, 153, 239)" }} />
                <div>{averageRating.toFixed(2)}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center text-xl px-4 font-semibold">
            Diagram över hur många filmer som har ett visst betyg
          </div>
          <LineChart movies={movies} />
        </div>
      )}
    </div>
  );
};

export default StatisticsInformation;
