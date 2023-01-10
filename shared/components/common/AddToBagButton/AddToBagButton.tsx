import { Button } from '../Button/Button'

const AddToBagButton = ({ ...restProps }) => {
  return (
    <div style={{ display: 'grid' }}>
      <Button appearance={'solidBlack'} {...restProps}>
        Add to cart
      </Button>
    </div>
  )
}

export default AddToBagButton
