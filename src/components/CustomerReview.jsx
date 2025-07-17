import React from 'react';
import user from '../assets/user.svg';
import star from '../assets/star.svg';
import greystar from '../assets/greystar.svg';

export const CustomerReview = (props) => {
  let starDiv = [];

  for (let i = 0; i < props.rating; i++) {
    starDiv.push(
      <div key={i}>
        <img src={star} alt="star" className="w-4 md:w-5" />
      </div>
    );
  }
  for (let i = 0; i < 5 - props.rating; i++) {
    starDiv.push(
      <div key={i + props.rating}>
        <img src={greystar} alt="grey star" className="w-4 md:w-5" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[350px] min-h-[220px] sm:min-h-[250px] md:min-h-[280px] lg:min-h-[300px] mx-auto sm:mx-4 p-4 sm:p-5 rounded-[20px] flex flex-col justify-between gap-4 bg-white shadow-md">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2">
          {!props.imge ? (
            <img
              src={user}
              className="bg-black/10 p-2 rounded-full w-10 h-10"
              alt="user"
            />
          ) : (
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={props.imge}
              alt="profile"
            />
          )}
          <h1 className="font-semibold text-sm md:text-base font-[Inter]">
            {props.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">{starDiv}</div>
          <p className="text-xs md:text-sm font-medium">{props.rating}/5</p>
        </div>
      </div>

      <div className="flex justify-center items-center grow text-center">
        {props.review && (
          <p className="text-xs sm:text-sm md:text-base italic px-1 sm:px-2">
            “{props.review}”
          </p>
        )}
      </div>
    </div>
  );
};
