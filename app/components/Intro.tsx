import hakunaMatatu from "public/images/hakuna_matatu.jpeg";

const Intro = () => {
  return (
    <div className="m-auto max-w-[1024px]">
      <h2 className="text-6xl">Hakuna Matatu</h2>
      <img className="m-auto mt-8 " src={hakunaMatatu} />
      <div className="flex">
        <div className="max-w-[500px]">
          <p className="text-left text-lg">
            …but this particular Toyota Prado was responsible for many of my
            most unforgettable moments during my time in Kenya. At the most
            basic level, it was the vehicle of transporting our group of
            researchers from our research base to fieldwork on a daily basis,
            but it was so much more. Through its windows, we’d see wildlife up
            close - elephants, giraffes, baboons, hyrax, many within twenty five
            meters. In its belly, we honed our Swahili, piecing together
            whatever Swahili we learned into sentences that wouldn’t make sense
            to anyone who hadn’t sat in this vehicle. Everyday, a new cast of
            characters would ride with us to our destinations. We’d squeeze into
            the vehicle haphazardly, with the first passengers squeezing through
            the trunk of the vehicle to sit in the third row. Each day, a
            different seating configuration developed, resulting in fresh
            conversations and dynamics from where each person sat. The following
            visualization documents where each person sat on each trip, and
            aggregates the seating to visualize where each person most often
            sat.
          </p>
        </div>
        <div className="-mt-16 mr-8 bg-white p-4">
          <img src="images/prado_inside.jpg" />
          <video className="mt-4" autoPlay muted loop>
            <source src="images/prado_buffalo.mov" type="video/mp4" />
          </video>
          <video className="mt-4" autoPlay muted loop>
            <source src="images/prado_plant_move.mov" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Intro;
