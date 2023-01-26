const test = async () => {
  const getmap = fetch('https://goo.gl/maps/v8Kt1tb19zEznYqp8');
  console.log(await getmap);
}

test();