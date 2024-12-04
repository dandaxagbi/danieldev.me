const jsonData = [
  {
    title: "CV FrontEnd",
    description: "Jiguchi is a software developer, etc....",
  },
  {
    title: "CV DANI",
    description: "Daniel is a software developer, etc....",
  },
];

const SinglePageCV = () => {
  const cv = jsonData[1];
  return (
    <div>
      <h1>{cv.title}</h1>
      <p>{cv.description}</p>
    </div>
  );
};
