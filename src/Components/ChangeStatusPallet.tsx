import React, {useState, ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import {Request} from '~/Utils';
import {Dialog, CheckBox} from '@rneui/themed';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import Button from '~/Components/Button';


type Props = {
    title?: ReactNode;
    visible: Boolean;
    onClose: Function;
    pallet: Object|any;
    bulk?: boolean;
    onSuccess?: Function;
    onFailed?: Function;
    value?: any;
  };

function ChangeStatusPallet(props : Props) {
  const [selectedStatus, setSelectedStatus] = useState(props?.pallet?.status);

  const ChangeStatus = async () => {
    await Request(
      'patch',
      'pallet-change-status-state',
      {},
      {state: selectedStatus},
      [props.pallet.id],
      ChangeStatusSuccess,
      ChangeStatusFailed,
    );
  };

  const ChangeStatusSuccess = (response : any) => {
    closeDialog()
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Pallet status updated',
    });
  };

  const ChangeStatusFailed = (response : any) => {
    const message = response?.response?.data?.message || 'Server error';
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: 'Failed',
      textBody: message,
    });
  };

  const closeDialog = () => {
    props.onClose()
  };

  const onCancel = () => {
    setSelectedStatus(props?.pallet?.status);
    closeDialog();
  };

  return (
    <Dialog isVisible={props.visible}>
      <Dialog.Title title="Change Pallet State" />
      <View>
        <CheckBox
          title="Storing"
          checked={selectedStatus === 'storing'}
          onPress={() => setSelectedStatus('storing')}
        />
        <CheckBox
          title="Lost"
          checked={selectedStatus === 'lost'}
          onPress={() => setSelectedStatus('lost')}
        />
        <CheckBox
          title="Damaged"
          checked={selectedStatus === 'damaged'}
          onPress={() => setSelectedStatus('damaged')}
        />
       {/*  <CheckBox
          title="Picking"
          checked={selectedStatus === 'picking'}
          onPress={() => setSelectedStatus('picking')}
        />
        <CheckBox
          title="Picked"
          checked={selectedStatus === 'picked'}
          onPress={() => setSelectedStatus('picked')}
        />
        <CheckBox
          title="Dispatched"
          checked={selectedStatus === 'dispatched'}
          onPress={() => setSelectedStatus('dispatched')}
        /> */}
        <View style={styles.dialogButtonContainer}>
          <Button type="secondary" title="Cancel" onPress={onCancel} />
          <Button type="primary" title="Submit" onPress={ChangeStatus} />
        </View>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
});

ChangeStatusPallet.defaultProps = {
    title: 'Change Pallet Status',
    visible: false,
    onClose: () => null,
    onSuccess: () => null,
    onFailed: () => null,
    value: null,
};

export default ChangeStatusPallet;
