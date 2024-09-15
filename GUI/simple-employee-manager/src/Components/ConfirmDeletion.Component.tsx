import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"

type ConfirmDeletionProps = {
  open: boolean;
  question: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDeletion: React.FC<ConfirmDeletionProps> = ({ open, question, onCancel, onConfirm }) => {

  return (

    <Dialog
      open={open}
      onClose={onCancel}
    >
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        {question}
      </DialogContent>
      <DialogActions>
        <Button  onClick={onCancel} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeletion