// tslint:disable
// this is an auto generated file. This will be overwritten

export const getTest = `query GetTest($id: String!) {
  getTest(id: $id) {
    id
    Fixtures
  }
}
`;
export const listTests = `query ListTests(
  $filter: TableTestFilterInput
  $limit: Int
  $nextToken: String
) {
  listTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      Fixtures
    }
    nextToken
  }
}
`;
