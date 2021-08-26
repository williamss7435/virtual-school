package com.escolavirtual.utils;

import java.util.concurrent.ThreadLocalRandom;

public class Utils {
	
	public static Long genericRandomRecord() {
		return ThreadLocalRandom.current().nextLong(99999l, 9999999999l);
	}
	
}
