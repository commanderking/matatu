import hakunaMatatu from "public/images/hakuna_matatu.jpeg";

const Intro = () => {
  return (
    <div className="m-auto max-w-[1024px]">
      <h2 className="text-6xl">Hakuna Matatu</h2>
      <img
        className="m-auto mt-8 "
        src={hakunaMatatu}
        alt="Group photo in front of Toyota Prado"
      />
      <div className="flex flex-wrap ">
        <div className="-mt-16 ml-8 mr-4 bg-white p-2 sm:w-full md:max-w-[45%]">
          <img src="images/prado_inside.jpg" alt="Toyota Prado Inside" />
          <video className="mt-2" autoPlay muted loop>
            <source src="images/prado_buffalo.mov" type="video/mp4" />
          </video>
          <video className="mt-2" autoPlay muted loop>
            <source src="images/prado_plant_move.mov" type="video/mp4" />
          </video>
        </div>
        <div className=" p-4 text-left text-lg sm:w-full md:max-w-[45%] ">
          <p className="mt-4 text-lg">
            …but this particular Toyota Prado was home to many unforgettable
            memories in Kenya. It was of course the vehicle for transporting us
            from the research base to fieldwork on a daily basis, but it was
            also our primary lens into Kenya’s beautiful landscapes and local
            culture. Through its windows, we saw wildlife up close - elephants,
            giraffes, baboons, and hyraxes. During our daily trips, we honed our
            Swahili, discussed differences in cultural values, and joked our way
            through a variety of topics.
          </p>
          <p className="mt-4">
            Everyday, a new cast of characters would jam into the Prado. Those
            sitting in the third row would squeeze in first by either entering
            through the trunk or hopping over the second row seats. Only then
            could the second row folks file into place. With every new seating
            arrangement, fresh conversations would sprout.
          </p>
          <p className="mt-4">
            The following visualization shows where each person sat on each trip
            over a nine day period. It also aggregates the frequency each rider
            sat in a particular space to show where each rider spent most of
            their time when riding in the Prado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
