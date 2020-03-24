import gql from 'graphql-tag'

const GET_SETTINGS = gql`{
  tags(last: 100) {
    id
    name
  }
  ranges
  settings {
    tagFilter
    levelFilter
    isFilterMenuOpen
  }
}`

interface SettingVars {
  name: string,
  value: any
}

export const updateSettings = (query: any, obj: Array<SettingVars>) => {
  const settings = { ...query.data.settings }
  obj.forEach((i: { name: string, value: any}) => {
    if (settings.hasOwnProperty(i.name)) {
      settings[i.name] = i.value;
    } else {
      console.error(`key '${i.name}' not in the settings object`)
    }
  })
  query.client.writeQuery({
    query: GET_SETTINGS,
    data: { settings }
  });
}
