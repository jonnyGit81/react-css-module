const withClass2 = (WrappedComponent, classes) => {
  return (props) => (
    <div className={classes}>
      <WrappedComponent {...props}/>
    </div>
  );
};

export default withClass2;
