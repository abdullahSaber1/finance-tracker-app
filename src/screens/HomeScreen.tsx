import {FlatList, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
  CustomButton,
  IconButton,
  RootScreen,
  Spinner,
  Typography,
} from "../components";
import {useAppDispatch, useAppSelector} from "../store/configureStore";
import {getTransactionsAsync} from "../store/slices/transactionSlice";
import {COLORS, SCALE, SIZES, FONTS, ICONS} from "../constants";
import {Transaction} from "../types";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {TabParamList} from "../navigation/BottonTab";
import dayjs from "dayjs";
import useSort from "../hooks/useSort";

const {vs, mvs, ms, s} = SCALE;
const {SortAZIcon, SortZAIcon} = ICONS;

type Props = BottomTabScreenProps<TabParamList, "Home"> & {};

const HomeScreen = ({navigation}: Props) => {
  const {transactions, balance, income, expenses, isLoading} = useAppSelector(
    state => state.transaction,
  );

  const {sortAscending, sortedData, toggleSort} = useSort(transactions);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactionsAsync());
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: Transaction; index: number}) => {
      return (
        <View style={styles.row}>
          <View>
            <Typography style={styles.itemTitle}>{item.description}</Typography>
            <Typography style={styles.itemTitle}>
              {dayjs(item.date).format("ddd, DD MMM YYYY")}
            </Typography>
          </View>
          <View>
            <Typography
              style={[
                styles.itemAmount,
                {
                  color:
                    item.type === "expense" ? COLORS.danger : COLORS.success,
                },
              ]}>
              {item.type === "expense" ? "-" : "+"} {item.amount}
            </Typography>
          </View>
        </View>
      );
    },
    [],
  );

  console.log("isLoading", isLoading);

  return (
    <RootScreen style={styles.root}>
      <View style={styles.balancConatiner}>
        <View>
          <Typography style={styles.balanceTitle}>Total Balance</Typography>
          <Typography style={styles.balancenumber}>${balance}</Typography>
        </View>
        <View style={[styles.row, {marginTop: mvs(SIZES.margin)}]}>
          <View>
            <Typography style={styles.balanceTitle}>Income</Typography>
            <Typography style={[styles.balancenumber]}>${income}</Typography>
          </View>
          <View>
            <Typography style={styles.balanceTitle}>Expenses</Typography>
            <Typography style={styles.balancenumber}>${expenses}</Typography>
          </View>
        </View>
      </View>

      <View style={[styles.row, styles.sortContainer]}>
        <Typography style={{...FONTS.h2}}>Sort</Typography>
        <IconButton
          style={{}}
          icon={
            sortAscending ? (
              <SortZAIcon fill={COLORS.white} width={s(24)} height={s(24)} />
            ) : (
              <SortAZIcon fill={COLORS.white} width={s(24)} height={s(24)} />
            )
          }
          onPress={toggleSort}
        />
      </View>

      <FlatList
        data={sortedData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{height: vs(20)}} />}
        ListEmptyComponent={
          isLoading ? (
            <Spinner />
          ) : (
            <View style={styles.emptyContainer}>
              <Typography style={styles.emptyTitle}>
                No transactions yet
              </Typography>
              <Typography style={styles.emptySubtitle}>
                make your fist transactions
              </Typography>

              <CustomButton
                label="Go"
                onPress={() => navigation.navigate("Add")}
                style={styles.btn}
                labelColor={COLORS.primary}
              />
            </View>
          )
        }
      />
    </RootScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {paddingHorizontal: ms(SIZES.padding), paddingTop: mvs(SIZES.padding)},
  row: {flexDirection: "row", justifyContent: "space-between"},
  balancConatiner: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingHorizontal: ms(SIZES.padding),
    paddingVertical: mvs(SIZES.padding),
    marginBottom: mvs(SIZES.margin),
  },
  balanceTitle: {...FONTS.h3, color: COLORS.white},

  balancenumber: {...FONTS.h2, color: COLORS.white},
  itemTitle: {...FONTS.h3},
  itemAmount: {...FONTS.h2},
  emptyContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(20),
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {color: COLORS.white, ...FONTS.h3},
  emptySubtitle: {color: COLORS.white, marginTop: mvs(20), ...FONTS.h3},
  btn: {backgroundColor: COLORS.white, width: "50%", marginTop: mvs(20)},
  sortContainer: {marginBottom: mvs(20), alignItems: "center"},
});
