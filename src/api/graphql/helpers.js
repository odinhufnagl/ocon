export const objectToGraphql = (input) => {
  const inputJSON = JSON.stringify(input);
  const graphQLInput = inputJSON.replace(/"([^(")"]+)":/g, '$1:');
  return graphQLInput;
};
