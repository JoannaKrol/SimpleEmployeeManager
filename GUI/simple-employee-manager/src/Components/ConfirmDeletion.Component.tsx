import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"

type ConfirmDeletionProps = {
  open: boolean;
  question: string;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
};

const ConfirmDeletion: React.FC<ConfirmDeletionProps> = ({ open, question, handleCancelDelete, handleConfirmDelete }) => {

  return (

    <Dialog
      open={open}
      onClose={handleCancelDelete}
    >
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        {question}
      </DialogContent>
      <DialogActions>
        <Button  onClick={handleCancelDelete} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeletion