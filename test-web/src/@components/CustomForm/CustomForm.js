import CustomBox from '@components/CustomBox';
import { Grid, Typography } from '@mui/material';
import CustomTextField from '@components/CustomTextField';
import CustomFilterSelect from '@components/CustomFilterSelect';
import CustomSelect from '@components/CustomSelect';
import CustomCheckBox from '@components/CustomCheckBox';
import CustomRadioCheck from '@components/CustomRadioCheck';

const CustomForm = ({ form }) => {
  return (
    <form>
      <Grid container spacing={2}>
        {form.map((item, index) => (
          <Grid item xs={item?.sizes?.sx} sm={item?.sizes?.sm} md={item?.sizes?.md} key={index}>
            <CustomBox>
              {item.title && (
                <Typography variant="subtitle2" className="subTitleBody2">
                  {item.title}
                </Typography>
              )}
            </CustomBox>
          </Grid>
        ))}
      </Grid>
    </form>
  );
};

export default CustomForm;
