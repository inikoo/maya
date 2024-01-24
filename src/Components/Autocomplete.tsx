import React, { memo, useState } from 'react'
import { Text, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

const Autocomplete = memo(() => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        initialValue={{ id: '2' }} // or just '2'
        onSelectItem={setSelectedItem}
        dataSet={[
          { id: '1', title: 'Alpha' },
          { id: '2', title: 'Beta' },
          { id: '3', title: 'Gamma' },
        ]}
      />
    </View>
  )
})


export default Autocomplete