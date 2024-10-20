
numbers = [1, 5, 2, 3, 1, 4, 1, 23, 12, 2, 3, 1, 2, 31, 23, 1, 2, 3, 1, 23, 1, 2, 3, 123]


start_index = numbers.index(5)


sum_of_elements = sum(numbers[i] for i in range(start_index, min(start_index + 10, len(numbers))))


print("Sum of the first ten elements starting from 5:", sum_of_elements)


